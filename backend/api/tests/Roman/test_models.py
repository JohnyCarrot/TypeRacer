from django.test import TestCase
from api.models import TypeRacerText, Bot

class TypeRacerTextModelTest(TestCase):
    def test_create_type_racer_text(self):
        TypeRacerText.objects.all().delete()
        text = TypeRacerText.objects.create(content="Toto je testovací text.")
        self.assertEqual(TypeRacerText.objects.count(), 1)
        self.assertEqual(text.content, "Toto je testovací text.")
        self.assertIsNotNone(text.created_at)

class BotModelTest(TestCase):
    def test_create_bot(self):
        Bot.objects.all().delete()
        bot = Bot.objects.create(name="TestBot", base_wpm=75)
        self.assertEqual(Bot.objects.count(), 1)
        self.assertEqual(bot.name, "TestBot")
        self.assertEqual(bot.base_wpm, 75)

    def test_bot_str_method(self):
        bot = Bot.objects.create(name="Speedy", base_wpm=90)
        self.assertEqual(str(bot), "Speedy (90 WPM)")
