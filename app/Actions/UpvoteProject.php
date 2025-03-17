<?php

namespace App\Actions;

use App\Models\Project;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class UpvoteProject
{
    /**
     * Upvote a project.
     */
    public function handle(User $user, Project $project): bool
    {
        try {
            DB::transaction(function () use ($user, $project) {
                Vote::create([
                    'user_id' => $user->id,
                    'project_id' => $project->id,
                ]);

                $project->increment('votes_count');
            });

            return true;
        } catch (QueryException $e) {
            // If the user has already voted for this project, a unique constraint violation will occur
            if ($e->getCode() === '23000') {
                return false;
            }

            throw $e;
        }
    }
}
