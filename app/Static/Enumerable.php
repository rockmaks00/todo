<?php

namespace App\Static;

trait Enumerable
{
    /**
     * Возвращает ключи констант
     */
    public static function keys()
    {
        return array_column(self::cases(), 'value');
    }
}