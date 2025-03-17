<?php

namespace App\Http\Controllers;

use App\Actions\CreateProject;
use App\Actions\DeleteProject;
use App\Actions\UpdateProject;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('projects/list', [
            'projects' => $projects,
        ]);
    }

    public function top(): Response
    {
        $projects = Project::with('user')
            ->orderByDesc('votes_count')
            ->paginate(10);

        return Inertia::render('projects/list', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('projects/create');
    }

    public function store(StoreProjectRequest $request, CreateProject $action): RedirectResponse
    {
        $action->handle($request->user(), $request->validated());

        return back();
    }

    public function destroy(Request $request, Project $project, DeleteProject $action): RedirectResponse
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $action->handle($project);

        return back();
    }
}
