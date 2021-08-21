from django.db import models


class CitizenGender(object):
    MALE  = "Male"
    FEMALE = "Female"
    OTHER  = "Other"
    CHOICES = [
        (MALE, MALE),
        (FEMALE, FEMALE),
        (OTHER, OTHER)
    ]


class Citizen(models.Model):
    id                      = models.CharField(max_length=12, primary_key=True, editable=False)
    first_name              = models.CharField(max_length=50)
    last_name               = models.CharField(max_length=50)
    gender                  = models.CharField(
                                max_length=10,
                                choices=CitizenGender.CHOICES
                            )
    date_of_birth           = models.DateField()
    address                 = models.CharField(max_length=200, null=True)
    
    def __str__(self):
        return f"{self.id} | {self.last_name + ' ' + self.first_name}" 