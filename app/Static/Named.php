<?php

namespace App\Static;

trait Named
{
    /**
     * Все возможные имена для каждого значения в виде key => name
     */
    abstract public static function names(): array;

    /**
     * Возвращает имя объекта
     */
    public function name(): string
    {
        return static::names()[$this->value];
    }
}