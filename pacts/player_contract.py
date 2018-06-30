import atexit
import unittest

from pact import Consumer, Provider
from pact import EachLike, Term, Like

from player import player

pact = Consumer('Consumer').has_pact_with(Provider('Provider'))
pact.start_service()
atexit.register(pact.stop_service)


class GetPlayerInfoContract(unittest.TestCase):
    def test_get_player_with_games(self):
        expected = Like({
            'id': Term('[a-zA-Z-]+', 'playerA'),
            'games': EachLike({
                'id': Term('[a-zA-Z-]+', 'gameA'),
            })
        })

        (pact
         .given('playerA exists and has games')
         .upon_receiving('a request for playerA')
         .with_request('get', '/api/players/playerA')
         .will_respond_with(200, body=expected))

        with pact:
            result = player('playerA')

#        self.assertEqual(result, expected)
