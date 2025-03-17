<?php

use App\Models\Project;

test('project to array returns expected structure', function () {
    $project = Project::factory()->create()->refresh();

    // Check that all expected keys exist (regardless of order)
    expect($project->toArray())->toHaveKeys([
        'id',
        'user_id',
        'title',
        'url',
        'description',
        'votes_count',
        'created_at',
        'updated_at',
    ]);
});
