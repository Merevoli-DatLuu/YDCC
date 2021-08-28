from math import sin, cos, sqrt, atan2, radians


def get_position_distance(latlon1, latlon2):
    R = 6373.0

    lat1 = radians(float(latlon1[0]))
    lon1 = radians(float(latlon1[1]))
    lat2 = radians(float(latlon2[0]))
    lon2 = radians(float(latlon2[1]))

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance