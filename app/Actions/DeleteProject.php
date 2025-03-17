<?php

namespace App\Actions;

use App\Models\Project;

class DeleteProject
{
    /**
     * Delete a project.
     */
    public function handle(Project $project): void
    {
        $project->delete();
    }
}
