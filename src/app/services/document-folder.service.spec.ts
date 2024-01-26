import { TestBed } from '@angular/core/testing';

import { DocumentFolderService } from './document-folder.service';

describe('DocumentFolderService', () => {
  let service: DocumentFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
