<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// All routes require authentication

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', App\Http\Controllers\DashboardController::class)->name('dashboard');
    
    // Project routes
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/top', [ProjectController::class, 'top'])->name('projects.top');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
    
    // Vote routes
    Route::post('/projects/{project}/votes', [VoteController::class, 'store'])->name('projects.votes.store');
    Route::delete('/projects/{project}/votes', [VoteController::class, 'destroy'])->name('projects.votes.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
