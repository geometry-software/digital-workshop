import { Injectable } from '@angular/core'
import { Observable, of, switchMap, take, tap } from 'rxjs'
import { RepositoryService } from 'src/app/shared/repository/repository.service'
import { User } from '../utils/auth.model'
import { AuthConstants } from '../utils/auth.constants'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly collection = AuthConstants.collectionName
  public user: string
  public users: Observable<User[]>

  constructor(private repositoryService: RepositoryService) {}

  login(name) {
    this.user = name
    return this.repositoryService.getAllDocuments<User>(this.collection).pipe(
      take(1),
      tap((users) => (this.users = of(users))),
      switchMap((value) => {
        const id = value.find((el) => el.name === name)?.id
        return !id
          ? this.repositoryService.createDocument<User>(this.collection, { name: name, timestamp: new Date() })
          : this.repositoryService.updateDocument<User>(this.collection, { timestamp: new Date() }, id)
      })
    )
  }
}
