import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service'; // Asegúrate de importar tu servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().then(isAuthenticated => {
      const authPages = ['/authpage', '/login', '/register'];
      if (isAuthenticated) {
        if (authPages.includes(state.url)) {
          this.router.navigate(['/mainmenu']); // Redirige al usuario a la página principal si está autenticado y trata de acceder a una página de autenticación
          return false;
        }
        return true;
      } else {
        if (authPages.includes(state.url)) {
          return true; // Permite el acceso a las páginas de autenticación si no está autenticado
        }
        this.router.navigate(['/login']); // Redirige al usuario a la página de login si no está autenticado y trata de acceder a otras páginas
        return false;
      }
    });
  }
}