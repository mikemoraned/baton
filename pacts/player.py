import requests


def player(player_id):
    """Fetch a player by id"""
    uri = 'http://localhost:1234/players/' + player_id
    return requests.get(uri).json()
