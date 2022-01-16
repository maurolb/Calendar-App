import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe('Tests on fetch helper', () => {

  let token = '';

  test('fetchSinToken should work', async () => {
    const resp = await fetchSinToken('auth', {email: 'admin@admin.com', password: 'asd123'}, 'POST');
    
    expect( resp instanceof Response ).toBe(true);

    const body = await resp.json();
    expect( body.ok ).toBe(true);

    token = body.token
  });
  
  test('fetchConToken should work', async () => {
    localStorage.setItem('token', token);

    const resp = await fetchConToken('events/61be0e5242649a0832c9bb32', {}, 'DELETE');
    const body = await resp.json();
    
    expect(body.message).toBe('Event id not found');
  });
  
  

});
