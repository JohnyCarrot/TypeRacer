from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import TypeRacerText, Bot

@receiver(post_migrate)
def create_default_texts_and_bots(sender, **kwargs):
    if not TypeRacerText.objects.exists():
        default_texts = [
            # --- Štandardné texty (10) ---
            "It is not hard to make money in the market. What is hard to avoid is the tempting urge to throw your money away on short, get-rich-quick speculative binges. It is an obvious lesson, but one often ignored by many.",
            "The mountains stood tall and silent, their snowy peaks glowing orange under the setting sun, as if whispering age-old secrets to the wind. Even from afar, they demanded respect, a timeless symbol of nature's slow power.",
            "Technology works best when it brings people together, creates connections, opens doors to knowledge, and allows individuals from around the world to collaborate in ways we once only dreamed of. In times of distance, this power is more important than ever.",
            "In the center of the ancient city, narrow stone streets echoed with footsteps and stories, each wall a quiet witness to centuries of change. Lanterns swayed gently in the evening breeze as if remembering moments lost to time.",
            "Time moves slowly while we wait for something to begin, but once it starts, it rushes forward like a river, carrying us past moments we meant to hold onto. We only notice the flow after it is already gone.",
            "As clouds gathered above the hills, a silence fell across the land. Birds stopped singing, and trees stood still. The first flash of lightning split the sky, and soon the rain washed everything in cool silver light.",
            "Creativity is not a single spark of brilliance but a small fire built over time. It must be fed with curiosity, patience, and bravery to try again. Eventually, that fire becomes a warm light guiding both you and others.",
            "Walking through the quiet forest, she noticed how sunlight danced through the leaves and painted golden shapes on the path. Each step away from the noise of the world helped her feel more like herself again.",
            "Typing is not only a skill but a rhythm, a flow of thoughts turned into letters and words. With enough practice, fingers begin to move almost on their own, building a kind of quiet speed and confidence.",
            "The future will reward those who stay flexible, learn constantly, and adapt without fear. Change is no longer something we prepare for now and then, but a part of daily life we must learn to move with.",

            # --- Extra dlhé texty (5) ---
            "In every generation, people are faced with challenges they did not choose, obstacles they did not create, and uncertain paths they must navigate with courage and resilience. What defines greatness is not the absence of struggle, but the willingness to face it head-on and to continue moving forward even when progress is slow. The strength of a person, or a community, lies not in perfection, but in persistence and shared purpose. When we walk together through difficulty, we often emerge wiser, stronger, and more united than we ever imagined.",
            "As the world became increasingly connected, the need for critical thinking, empathy, and collaboration grew more urgent than ever. Gone are the days when knowledge alone was enough. Now, success requires the ability to adapt, to listen across differences, and to build bridges rather than walls. The most meaningful progress comes not from competing to be heard, but from working together to understand. In a time of great change, it is our humanity—not our cleverness—that will guide us through.",
            "She stood at the edge of the sea, watching the waves crash and pull away again, each motion like the breath of something ancient and immense. The horizon stretched out endlessly before her, as if inviting her to dream beyond the limits she had always believed were fixed. Every journey begins not with a step, but with the courage to imagine a different ending. And so she closed her eyes, let the salty wind touch her face, and promised herself she would try—because even the smallest wave begins with movement.",
            "To truly master a skill is to fall in love with the process, not the outcome. Progress is not linear, and growth is rarely glamorous. There will be days when the words will not come, when the keys feel foreign beneath your fingers, and nothing flows. But then there will be days when time disappears, and the rhythm finds you like a current, carrying you further than you thought you could go. That is the reward: not perfection, but presence. Not control, but connection.",
            "The stars above us have witnessed the birth of galaxies, the rise and fall of empires, and the quiet moments when someone chooses kindness over cruelty. They remind us how small we are and yet how infinite our possibilities can be. In the quiet of night, when the world has slowed and the distractions fade, we are invited to wonder. Not just about what is out there, but about who we are becoming—and who we could be, if only we dared to believe in more than what we see."
        ]

        for content in default_texts:
            TypeRacerText.objects.create(content=content)

    if not Bot.objects.exists():
        default_bots = [
            ("Speedy Joe", 35), ("Turbo Tina", 38), ("Lazy Tuna", 19), ("Hyper Hugo", 33),
            ("Steady Sam", 22), ("Zippy Zoe", 30), ("Unfocused Fred", 15), ("Fat Bella", 19),
            ("Mellow Max", 24), ("Rapid Rita", 39), ("Cool Chloe", 20), ("Calm Carl", 20),
            ("Electric Ellie", 25), ("Sleepy Joe", 12), ("Diaper Dony", 17), ("Slow Sue", 16),
            ("Dizzy Dan", 21), ("Snappy Sara", 22), ("Fast Finn", 21), ("Frozen Finger", 15),
        ]

        for name, wpm in default_bots:
            Bot.objects.create(name=name, base_wpm=wpm)
