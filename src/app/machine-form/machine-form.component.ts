import { Component, OnInit } from "@angular/core";
import { Machine } from "../machine";
import { ConnectivityService } from "../connectivity.service";

@Component({
  selector: "app-machine-form",
  templateUrl: "./machine-form.component.html",
  styleUrls: ["./machine-form.component.css"],
})
export class MachineFormComponent implements OnInit {
  constructor(private csService: ConnectivityService) {}

  ngOnInit(): void {}

  types = ["first", "Second", "Third", "Fourth"];

  machine = new Machine();

  submitted = false;

  onSubmit() {
    var newMachine: Machine = new Machine(
      this.machine.id,
      this.machine.name,
      this.machine.type,
      this.machine.year
    );
    this.csService.InsertNewMachine(newMachine).subscribe((data) => {
      console.log(data);
    });
    this.submitted = true;
  }

  newMachine() {
    this.machine = new Machine(3, "", "", 1988);
  }

  skyDog(): Machine {
    let myMachine = new Machine(2, "SkyDog", "fifth", 1988);
    console.log("My machine is called " + myMachine.name); // "My hero is called SkyDog"
    return myMachine;
  }

  showFormControls(form: any) {
    return form && form.controls["name"] && form.controls["name"].value;
  }
}
