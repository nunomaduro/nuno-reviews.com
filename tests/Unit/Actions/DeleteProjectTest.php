<?php

use App\Actions\DeleteProject;
use App\Models\Project;
use App\Models\User;

test('it can delete a project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create([
        'user_id' => $user->id,
    ]);
    
    $projectId = $project->id;
    
    $action = new DeleteProject();
    $action->handle($project);
    
    expect(Project::find($projectId))->toBeNull();
});
