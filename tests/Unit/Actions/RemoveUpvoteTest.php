<?php

use App\Actions\RemoveUpvote;
use App\Models\Project;
use App\Models\User;
use App\Models\Vote;

test('it can remove an upvote from a project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create([
        'votes_count' => 1,
    ]);
    
    // Create a vote
    Vote::create([
        'user_id' => $user->id,
        'project_id' => $project->id,
    ]);
    
    $action = new RemoveUpvote();
    $result = $action->handle($user, $project);
    
    expect($result)->toBeTrue();
    
    $project->refresh();
    
    expect($project->votes_count)->toBe(0);
    
    $vote = Vote::where('user_id', $user->id)
        ->where('project_id', $project->id)
        ->first();
    
    expect($vote)->toBeNull();
});

test('it returns false if no upvote exists', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create([
        'votes_count' => 0,
    ]);
    
    $action = new RemoveUpvote();
    $result = $action->handle($user, $project);
    
    expect($result)->toBeFalse();
    
    $project->refresh();
    
    expect($project->votes_count)->toBe(0);
});
