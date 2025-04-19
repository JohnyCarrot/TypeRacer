from django.db import models

class TypeRacerText(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Bot(models.Model):
    name = models.CharField(max_length=100)
    base_wpm = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} ({self.base_wpm} WPM)"