export async function GET(request: Request) {
  const response = await fetch('https://auth.kurly.com/session', {
    headers: {
      // "accept": "application/json, text/plain, */*",
      // "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      'kurly-auth-dev': 'true',
      // "cookie": "amp_18fa79=PvB6o7pWXvXhGUGfOwb34W...1iff3inpd.1iff3inpd.0.0.0; _fbp=fb.1.1734600122290.923043890280879146; _ga_2K2GN0FFY0=GS1.1.1734601486.2.0.1734601486.60.0.0; cart_count=0; ksi=AUfWFBejRwFC6L3vgc9-ob-iAAABk-JNlRo; krt=AUfWFBejRwFC6L3vgc9-ob-iWqLJhFGiE-B4zeb6O-BE0dY1QPU; kdi=zYliyo8hTXGCF0gAcsilqg; _clck=euqck0%7C2%7Cfru%7C0%7C1814; amplitudeBucket=%7B%22browse_id%22%3A%229dm905MEH9fSG6xmV7zs6%22%2C%22screen_name%22%3A%22recommendation%22%2C%22previous_screen_name%22%3A%22cart%22%2C%22browse_screen_name%22%3A%22recommendation%22%2C%22browse_tab_name%22%3A%22home%22%2C%22browse_site_name%22%3A%22market%22%2C%22sign_up_source_screen_name%22%3A%22recommendation%22%2C%22is_release_build%22%3Atrue%7D; _clsk=7gotdr%7C1734650561827%7C2%7C0%7Cm.clarity.ms%2Fcollect; amp_65bebb=ioSfkGGIVWWUfwsXqFV5Km...1ifgjlqu7.1ifgjmmta.0.2.2",
    },
  });
  const result = await response.json();
  return Response.json(result);
}