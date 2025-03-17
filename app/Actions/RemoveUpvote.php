<?php

namespace App\Actions;

use App\Models\Project;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Support\Facades\DB;

class RemoveUpvote
{
    /**
     * Remove an upvote from a project.
     */
    public function handle(User $user, Project $project): bool
    {
        $vote = Vote::where('user_id', $user->id)
            ->where('project_id', $project->id)
            ->first();

        if (! $vote) {
            return false;
        }

        DB::transaction(function () use ($vote, $project) {
            $vote->delete();

            $project->decrement('votes_count');
        });

        return true;
    }
}
