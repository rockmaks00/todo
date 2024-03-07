<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Task\CreateTaskRequest;
use App\Http\Requests\Api\Task\UpdateTaskRequest;
use App\Models\Task;
use App\Models\User;
use App\Static\Enumerables\Priority;
use App\Static\Enumerables\Status;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    /**
     * Заполняет указанные поля с помощью enum / по возможности вынести в сериализатор
     *
     * @param array $enums ['modelField' => 'ENumClass']
     */
    public static function setEnums(array $model, array $enums): array
    {
        foreach ($enums as $key => $name) {
            $enum = ($name)::from($model[$key]);
            $model[$key] = [
                'id' => $enum->value,
                'name' => $enum->label(),
            ];
        }
        return $model;
    }

    public function get(Request $request): Response
    {
        $userId = $request->user()->id;
        $tasks = Task::where('responsible', $userId)
            ->orWhere('creator', $userId)
            ->with('responsible')
            ->orderByDesc('updated_at')
            ->get()
            ->toArray();

        foreach ($tasks as &$task) {
            $task = static::setEnums($task, [
                'status' => Status::class,
                'priority' => Priority::class
            ]);
            $task['deadline'] = date('d.m.Y', strtotime($task['deadline']));
        }

        return response($tasks);
    }

    public function getTask(int $id): Response
    {
        $task = Task::find($id);
        $task['deadline'] = date('Y-m-d', strtotime($task['deadline']));
        return response($task);
    }

    public function create(CreateTaskRequest $request): Response
    {
        $data = $request->validated();

        /** @var User */
        $user = $request->user();

        $data['status'] = Status::ForExecution->value;
        $data['creator'] = $user->id;

        Task::create($data);
        return response(status: 201);
    }

    public function update(UpdateTaskRequest $request): Response
    {
        $data = $request->validated();
        /** @var User */
        $user = $request->user();
        /** @var Task */
        $task = Task::find($data['id']);

        // проверяем является ли пользователь создателем
        if ($task->creator()->first()->id === $user->id) {
            $task->update($data);
            $task->save();
            return response(status: 201);
        }

        // или ответственным
        if ($task->responsible()->first()->id === $user->id) {
            if ($task->status !== $data['status']) {
                $task->status = $data['status'];
                $task->save();
            }
            return response(status: 201);
        }

        return response(status: 403);
    }
}
