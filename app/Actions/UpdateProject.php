<?php

namespace App\Actions;

use App\Models\Project;

class UpdateProject
{
    /**
     * Update an existing project.
     */
    public function handle(Project $project, array $data): Project
    {
        $project->update([
            'title' => $data['title'] ?? $project->title,
            'url' => $data['url'] ?? $project->url,
            'description' => $data['description'] ?? $project->description,
        ]);

        return $project->refresh();
    }
}
