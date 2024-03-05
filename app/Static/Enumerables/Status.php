<?php

namespace App\Static\Enumerables;

use App\Static\Enumerable;
use App\Static\Named;

enum Status: int
{
    use Enumerable;
    use Named;

    case ForExecution = 1;
    case InProgress = 2;
    case Completed = 3;
    case Canceled = 4;

    public static function names(): array
    {
        return [
            self::ForExecution->value => 'К выполнению',
            self::InProgress->value => 'Выполняется',
            self::Completed->value => 'Выполнена',
            self::Canceled->value => 'Отменена',
        ];
    }
}