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
use Illuminate\Support\Carbon;

class TaskController extends Controller
{
    /**
     * Подготовка данных для отправки
     * по возможности вынести в репозиторий
     */
    public static function prepareData(array $tasks): array
    {
        $enums = [
            'status' => Status::class,
            'priority' => Priority::class
        ];

        foreach ($tasks as &$task) {
            foreach ($enums as $key => $name) {
                $enum = ($name)::from($task[$key]);
                $task[$key] = [
                    'id' => $enum->value,
                    'name' => $enum->label(),
                ];

                $task['deadline'] = date('d.m.Y', strtotime($task['deadline']));
            }
        }

        return $tasks;
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

        $tasks = static::prepareData($tasks);
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

    public function getGroupedByDeadline(Request $request): Response
    {
        $userId = $request->user()->id;
        $today = Carbon::today();
        $week = Carbon::today()->addWeek();

        $tasks = Task::where('responsible', $userId)
            ->with('responsible')
            ->get()
            ->groupBy(function ($task) use ($today, $week) {
                $deadline = Carbon::createFromFormat('Y-m-d H:i:s', $task->deadline);

                if ($deadline->isSameDay($today) || $deadline->isPast()) {
                    return 'today';
                } elseif ($deadline->isBetween($today, $week)) {
                    return 'week';
                } else {
                    return 'future';
                }
            })
            ->toArray();

        foreach ($tasks as $group => $taskList) {
            $tasks[$group] = static::prepareData($taskList);
        }

        return response($tasks);
    }

    public function getGroupedByResponsible(Request $request): Response
    {
        $userId = $request->user()->id;
        $tasks = Task::where('responsible', $userId)
            ->orWhere('creator', $userId)
            ->with('responsible')
            ->get()
            ->groupBy('responsible')
            ->toArray();

        foreach ($tasks as $group => $taskList) {
            $tasks[$group] = static::prepareData($taskList);
        }

        return response($tasks);
    }
}
