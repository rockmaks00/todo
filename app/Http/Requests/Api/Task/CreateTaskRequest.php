<?php

namespace App\Http\Requests\Api\Task;

use App\Http\Requests\Api\TaskRequest;
use App\Static\Enumerables\Priority;
use App\Static\Enumerables\Status;
use Illuminate\Validation\Rule;

class CreateTaskRequest extends TaskRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "header" => "required|between:1,20",
            "description" => "required|between:1,255",
            "deadline" => "required|date",
            "priority" => ["required", Rule::enum(Priority::class)],
            "status" => ["sometimes", Rule::enum(Status::class)],
            "responsible" => "required|integer",
        ];
    }
}
