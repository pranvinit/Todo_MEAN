import { TestBed } from '@angular/core/testing';

import { TodoResolverService } from './todo-resolver.service';

describe('TodoResolverService', () => {
  let service: TodoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
