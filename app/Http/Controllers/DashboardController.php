<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Vote;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        
        // Get stats
        $stats = [
            'total_projects' => Project::count(),
            'total_votes' => Vote::count(),
            'user_projects' => Project::where('user_id', $user->id)->count(),
        ];
        
        // Get user's recent projects
        $recent_projects = Project::where('user_id', $user->id)
            ->latest()
            ->take(3)
            ->get();
            
        // Get user's recent votes
        $recent_votes = Vote::with('project')
            ->where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();
        
        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recent_projects' => $recent_projects,
            'recent_votes' => $recent_votes,
        ]);
    }
}
