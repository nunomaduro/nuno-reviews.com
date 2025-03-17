<?php

namespace App\Actions;

use App\Models\Project;
use App\Models\User;

class CreateProject
{
    /**
     * Create a new project.
     */
    public function handle(User $user, array $data): Project
    {
        return $user->projects()->create([
            'title' => $data['title'],
            'url' => $data['url'],
            'description' => $data['description'] ?? null,
            'votes_count' => 0,
        ]);
    }
}
