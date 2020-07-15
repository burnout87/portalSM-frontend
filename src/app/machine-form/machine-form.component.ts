import { Component, OnInit } from "@angular/core";
import { Machine } from "../machine";

@Component({
  selector: "app-machine-form",
  templateUrl: "./machine-form.component.html",
  styleUrls: ["./machine-form.component.css"],
})
export class MachineFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  types = ["first", "Second", "Third", "Fourth"];

  machine = new Machine(1, "first", this.types[0], 1987);

  submitted = false;

  onSubmit() {
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
