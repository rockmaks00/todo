<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Task\CreateTaskRequest;
use App\Http\Requests\Api\Task\UpdateTaskRequest;
use App\Models\Task;
use App\Models\User;
use App\Static\Enumerables\Status;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    public function get(Request $request): Response
    {
        $userId = $request->user()->id;
        $tasks = Task::where('responsible', $userId)
            ->orWhere('creator', $userId)
            ->with('responsible')
            ->orderByDesc('updated_at')
            ->get();

        return response($tasks);
    }

    public function getTask(int $id): Response
    {
        $task = Task::find($id);
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

        if ($task->responsible()->first()->id === $user->id) {
            if ($task->status !== $data['status']) {
                $task->status = $data['status'];
                $task->save();
            }
            return response(status: 201);
        }

        if ($task->creator()->first()->id === $user->id) {
            $task->update($data);
            $task->save();
            return response(status: 201);
        }

        return response(status: 403);
    }
}
