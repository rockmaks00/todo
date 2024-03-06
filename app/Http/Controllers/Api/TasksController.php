<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TasksController extends Controller
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
}
