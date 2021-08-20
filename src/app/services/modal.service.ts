import {ConfirmModalComponent} from "../components/modals/confirm-modal/confirm-modal.component";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private _modalService: NgbModal) {}

  open(): NgbModalRef {
    return this._modalService.open(ConfirmModalComponent, {size: 'sm'});
  }
}
