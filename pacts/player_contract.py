import atexit
import unittest

from pact import Consumer, Provider

from player import player

pact = Consumer('Consumer').has_pact_with(Provider('Provider'))
pact.start_service()
atexit.register(pact.stop_service)


class GetPlayerInfoContract(unittest.TestCase):
    def test_get_user(self):
        expected = {
            'id': 'playerA'
        }

        (pact
         .given('playerA exists')
         .upon_receiving('a request for playerA')
         .with_request('get', '/players/playerA')
         .will_respond_with(200, body=expected))

        with pact:
            result = player('playerA')

        self.assertEqual(result, expected)
