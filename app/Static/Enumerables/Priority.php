<?php

namespace App\Static\Enumerables;

use App\Static\Enumerable;
use App\Static\Named;

enum Priority: int
{
    use Enumerable;
    use Named;

    case LOW = 1;
    case MEDIUM = 2;
    case HIGH = 3;

    public static function names(): array
    {
        return [
            self::LOW->value => 'Низкий',
            self::MEDIUM->value => 'Средний',
            self::HIGH->value => 'Высокий',
        ];
    }
}