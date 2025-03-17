<?php

use App\Actions\CreateProject;
use App\Models\User;

test('it can create a project', function () {
    $user = User::factory()->create();

    $data = [
        'title' => 'Test Project',
        'url' => 'https://example.com/test-project',
        'description' => 'This is a test project',
    ];

    $action = new CreateProject();
    $project = $action->handle($user, $data);

    expect($project->title)->toBe('Test Project')
        ->and($project->url)->toBe('https://example.com/test-project')
        ->and($project->description)->toBe('This is a test project')
        ->and($project->user_id)->toBe($user->id)
        ->and($project->votes_count)->toBe(0);
});

test('it can create a project without description', function () {
    $user = User::factory()->create();

    $data = [
        'title' => 'Test Project',
        'url' => 'https://example.com/test-project',
    ];

    $action = new CreateProject();
    $project = $action->handle($user, $data);

    expect($project->title)->toBe('Test Project')
        ->and($project->url)->toBe('https://example.com/test-project')
        ->and($project->description)->toBeNull()
        ->and($project->user_id)->toBe($user->id);
});
