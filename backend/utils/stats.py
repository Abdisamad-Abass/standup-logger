from models import StandupPost
from datetime import datetime, timedelta


def generate_stats():
    # Fetch all standup posts from database
    posts = StandupPost.query.all()

    # Get today's date (UTC-based)
    today = datetime.utcnow().date()

     # Build a list of the last 7 days (including today)
    last_7_days = [
        today - timedelta(days=i)
        for i in range(6, -1, -1)
    ]

    stats = []

    # POSTS + BLOCKERS PER DAY
    for day in last_7_days:

        count = 0
        blocker_count = 0

        # Count posts and blockers for each day
        for p in posts:

            if p.timestamp.date() == day:

                count += 1

                if p.has_blocker:
                    blocker_count += 1

        stats.append({
            "date": day.strftime("%a"),
            "posts": count,
            "blockers": blocker_count
        })

    # TEAM ACTIVITY
    activity = {}

    # Count how many posts each author has made
    for p in posts:

        activity[p.author] = (
            activity.get(p.author, 0) + 1
        )

    return {
        "total_posts": len(posts),

        # Total number of posts marked as blockers
        "total_blockers": sum(
            1
            for p in posts
            if p.has_blocker
        ),

        # Daily breakdown (posts + blockers per day)
        "posts_per_day": stats,

        "blockers_per_day": stats,

        # Team contribution summary (who posted how much)
        "team_activity": [
            {
                "author": k,
                "posts": v
            }
            for k, v
            in activity.items()
        ]
    }