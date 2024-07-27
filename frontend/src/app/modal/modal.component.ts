import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() eventToggleModal: EventEmitter<boolean> = new EventEmitter();

  closeModal() {
    this.isOpen = false;
    this.eventToggleModal.emit(this.isOpen);
    console.log('Emitted a value');
  }
}
