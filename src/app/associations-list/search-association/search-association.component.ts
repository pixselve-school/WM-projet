import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AssociationsService } from '../../associations.service';

@Component({
  selector: 'app-search-association',
  templateUrl: './search-association.component.html',
  styleUrls: ['./search-association.component.css'],
})
export class SearchAssociationComponent implements OnInit {
  searchBar = this.fb.control('', { nonNullable: true });

  loading = false;
  @Input() search!: (
    search: string
  ) => Promise<{ text: string; link: string } | null>;

  searchResult: { text: string; link: string } | null = null;

  queryOnSearch = '';
  searched = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly associationsService: AssociationsService
  ) {}

  async submit(event: SubmitEvent) {
    try {
      event.preventDefault();
      this.loading = true;
      this.searched = true;
      this.queryOnSearch = this.searchBar.value;
      this.searchResult = await this.search(this.searchBar.value);
    } catch (error) {
      console.error(error);
      this.searchResult = null;
    } finally {
      this.loading = false;
    }
  }

  ngOnInit(): void {}
}
