<?php

use App\Static\Enumerables\Priority;
use App\Static\Enumerables\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('header');
            $table->string('description');
            $table->dateTime('deadline');
            $table->timestamps();
            $table->integer('status');
            $table->integer('priority');
            $table->foreignId('creator')->constrained('users');
            $table->foreignId('responsible')->constrained('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
