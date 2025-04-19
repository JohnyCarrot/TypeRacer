from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import TypeRacerText

@receiver(post_migrate)
def create_default_texts(sender, **kwargs):
    if TypeRacerText.objects.exists():
        return

    default_texts = [
        "It is not hard to make money in the market. What is hard to avoid is the tempting urge to throw your money away on short, get-rich-quick speculative binges. It is an obvious lesson, but one often ignored by many.",

        "The mountains stood tall and silent, their snowy peaks glowing orange under the setting sun, as if whispering age-old secrets to the wind. Even from afar, they demanded respect, a timeless symbol of nature's slow power.",

        "Technology works best when it brings people together, creates connections, opens doors to knowledge, and allows individuals from around the world to collaborate in ways we once only dreamed of. In times of distance, this power is more important than ever.",

        "In the center of the ancient city, narrow stone streets echoed with footsteps and stories, each wall a quiet witness to centuries of change. Lanterns swayed gently in the evening breeze as if remembering moments lost to time.",

        "Time moves slowly while we wait for something to begin, but once it starts, it rushes forward like a river, carrying us past moments we meant to hold onto. We only notice the flow after it is already gone.",

        "As clouds gathered above the hills, a silence fell across the land. Birds stopped singing, and trees stood still. The first flash of lightning split the sky, and soon the rain washed everything in cool silver light.",

        "Creativity is not a single spark of brilliance but a small fire built over time. It must be fed with curiosity, patience, and bravery to try again. Eventually, that fire becomes a warm light guiding both you and others.",

        "Walking through the quiet forest, she noticed how sunlight danced through the leaves and painted golden shapes on the path. Each step away from the noise of the world helped her feel more like herself again.",

        "Typing is not only a skill but a rhythm, a flow of thoughts turned into letters and words. With enough practice, fingers begin to move almost on their own, building a kind of quiet speed and confidence.",

        "The future will reward those who stay flexible, learn constantly, and adapt without fear. Change is no longer something we prepare for now and then, but a part of daily life we must learn to move with."
    ]

    for content in default_texts:
        TypeRacerText.objects.create(content=content)
