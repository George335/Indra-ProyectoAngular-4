import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('Spotify service listo')
  }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD7gbeYMjUKrT88eRPy4d6UNmVWVUUMjcsisgWah3iD0wP8TXP2Wb7EWlq-ouZr5Q1JCViuW5XImGksO_8'
    });
   
    return this.http.get(url, {headers});
    
  }

  getNewReleases(){
    
    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( data => data['albums'].items) );
    
  }

  getArtistas( termino: string ){

    return this.getQuery(`search?q=${ termino }&type=artist&offset=0&limit=15`)
                .pipe( map( data => data['artists'].items) );
    
  }

  getArtista( id: string ){

    return this.getQuery(`artists/${ id }`);
                // .pipe( map( data => data['artists'].items) );
    
  }
}
