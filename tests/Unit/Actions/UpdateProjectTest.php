<?php

use App\Actions\UpdateProject;
use App\Models\Project;
use App\Models\User;

test('it can update a project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create([
        'user_id' => $user->id,
        'title' => 'Original Title',
        'url' => 'https://example.com/original',
        'description' => 'Original description',
    ]);
    
    $data = [
        'title' => 'Updated Title',
        'url' => 'https://example.com/updated',
        'description' => 'Updated description',
    ];
    
    $action = new UpdateProject();
    $updatedProject = $action->handle($project, $data);
    
    expect($updatedProject->title)->toBe('Updated Title')
        ->and($updatedProject->url)->toBe('https://example.com/updated')
        ->and($updatedProject->description)->toBe('Updated description')
        ->and($updatedProject->user_id)->toBe($user->id);
});

test('it can partially update a project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create([
        'user_id' => $user->id,
        'title' => 'Original Title',
        'url' => 'https://example.com/original',
        'description' => 'Original description',
    ]);
    
    $data = [
        'title' => 'Updated Title',
    ];
    
    $action = new UpdateProject();
    $updatedProject = $action->handle($project, $data);
    
    expect($updatedProject->title)->toBe('Updated Title')
        ->and($updatedProject->url)->toBe('https://example.com/original')
        ->and($updatedProject->description)->toBe('Original description');
});
