<?php

namespace App\Http\Requests\Api\Task;

use App\Http\Requests\Api\TaskRequest;
use App\Static\Enumerables\Priority;
use App\Static\Enumerables\Status;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends TaskRequest
{
    public function authorize(): bool
    {
        return false;
    }

    public function rules(): array
    {
        return [
            "id" => "required|integer",
            "header" => "sometimes|between:1,20",
            "description" => "sometimes|between:1,255",
            "deadline" => "sometimes|date",
            "responsible" => "sometimes|integer",
            "priority" => ["sometimes|integer", Rule::enum(Priority::class)],
            "status" => ["sometimes|integer", Rule::enum(Status::class)],
        ];
    }
}
