<?php

use App\Actions\UpvoteProject;
use App\Models\Project;
use App\Models\User;
use App\Models\Vote;

test('it can upvote a project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create([
        'votes_count' => 0,
    ]);
    
    $action = new UpvoteProject();
    $result = $action->handle($user, $project);
    
    expect($result)->toBeTrue();
    
    $project->refresh();
    
    expect($project->votes_count)->toBe(1);
    
    $vote = Vote::where('user_id', $user->id)
        ->where('project_id', $project->id)
        ->first();
    
    expect($vote)->not->toBeNull();
});

test('it cannot upvote a project twice', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create([
        'votes_count' => 1,
    ]);
    
    // Create an initial vote
    Vote::create([
        'user_id' => $user->id,
        'project_id' => $project->id,
    ]);
    
    $action = new UpvoteProject();
    $result = $action->handle($user, $project);
    
    expect($result)->toBeFalse();
    
    $project->refresh();
    
    expect($project->votes_count)->toBe(1);
    
    $voteCount = Vote::where('user_id', $user->id)
        ->where('project_id', $project->id)
        ->count();
    
    expect($voteCount)->toBe(1);
});
