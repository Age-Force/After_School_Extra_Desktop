<template>
    <Page>
        <ActionBar title="Group2 Lab3" />
        <FlexboxLayout class="page">
            <TabView height="100%" androidTabsPosition="button"
                backgroundColor="#d0d2d6">

                <!--Log-In Tab-->
                <TabViewItem title="Log in">
                    <StackLayout orientation="vertical">
                        <Label class="header" text="AFTER SCHOOL LESSONS" />
                        <StackLayout class="enter">
                            <TextField col="0" row="0" v-model="status"
                                editable="false" />
                            <TextField col="0" row="0" v-model="errors[0]"
                                editable="false" />
                            <TextField col="0" row="0" v-model="email"
                                hint="Enter Email..." editable="true"
                                @returnPress="onButtonTap" />
                            <TextField col="0" row="0" v-model="password"
                                hint="Enter Password..." editable="true"
                                @returnPress="onButtonTap" />
                            <Button col="1" row="0" text="Log In"
                                class="btn btn-primary m-t-20" @tap="login" />
                        </StackLayout>
                    </StackLayout>
                </TabViewItem>

                <!--Registration Tab-->
                <TabViewItem title="Register">
                    <StackLayout orientation="vertical">
                        <Label class="header" text="AFTER SCHOOL LESSONS" />
                        <StackLayout class="enter">
                            <TextField col="0" row="0" v-model="errors[0]"
                                editable="false" />
                            <TextField col="0" row="0" v-model="name"
                                hint="Enter Name..." editable="true"
                                @returnPress="onButtonTap" />
                            <TextField col="0" row="0" v-model="email"
                                hint="Enter Email..." editable="true"
                                @returnPress="onButtonTap" />
                            <TextField col="0" row="0" type="password"
                                v-model="password" hint="Enter Password..."
                                editable="true" @returnPress="onButtonTap" />
                            <TextField col="0" row="0" v-model="usertype"
                                hint="Enter Usertype..." editable="true"
                                @returnPress="onButtonTap" />
                            <Button col="1" row="0" text="Submit"
                                class="btn btn-primary m-t-20"
                                @tap="register" />
                        </StackLayout>
                    </StackLayout>
                </TabViewItem>
            </TabView>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import Search from "./Search";
    import Vue from "nativescript-vue";
    var ngorkstring = "https://7951038b.ngrok.io";

    export default {
        methods: {
            onOpenDrawerTap() {
                this.$refs.drawer.nativeView.showDrawer();
            },
            onCloseDrawerTap() {
                this.$refs.drawer.nativeView.closeDrawer();
            },

            onSearchSubmit(args) {
                let searchBar = args.object;
            },

            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
            },

            validEmail: function(emai) {
                var re =
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
                return re.test(emai);
            },

            //form validation
            checkForm: function(e) {
                if (this.name && this.email) {
                    return true;
                }
                this.errors = [];

                if (!this.name) {
                    this.errors.push("Name required.");
                }

                if (!this.password) {
                    this.errors.push("Password required.");
                }

                if (!this.email) {
                    this.errors.push("Please Enter Email.");
                }

                if (!this.validEmail(this.email)) {
                    this.errors.push("Please Enter Correct Email Format");
                }

                console.log(this.errors[0]);
                console.log(this.errors.length);
            },

            //this is to register a new user into the mongoDB
            register() {
                console.log("Name: " + this.name);
                console.log("Password : " + this.password);
                console.log("Email:" + this.email);

                var details = {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    usertype: this.usertype
                };

                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                this.errors = [];
                this.checkForm();
                if (this.errors[0] == null) {
                    fetch(ngorkstring + "/form_decision", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                        },
                        body: formBody
                    });
                    console.log("submitting to database");
                } else console.log("theres an error");

                console.log(this.errors);
                console.log(formBody);
                this.$navigateTo(Search);
            },

            //fetching users form the database.
            login() {
                console.log("Attempting Log in");
                var details = {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    usertype: this.usertype
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

                if (this.errors[0] == null) {
                    fetch(ngorkstring + "/logindecision", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                        },
                        body: formBody
                    }).then(response => {
                        response.json().then(data => {
                            console.log(data["password"]);

                            if (data != 0) {
                                if (data["password"] == this
                                    .password) {
                                    this.status = "Welcome " +
                                        data["name"];

                                    setTimeout(() => {
                                        this.$navigateTo(
                                            Search
                                            );
                                    }, 2000);
                                } else this.status =
                                    "Wrong password: Try again";
                            } else this.status =
                                "Wrong email: User Not Found";
                        });
                    });
                } else console.log("theres an error");
                console.log(formBody);
            }
        },

        //this is the search function.
        created: function(allcourses) {
            console.log("App Started ");
            fetch(ngorkstring + "/allcourses").then(response => {
                return response.json().then(classes => {
                    this.classes = classes;
                });
            });
            console.log(this.classes);
            console.log(this.searchPhrase);
        },

        data() {
            return {
                status: "",
                issort: false,
                searchPhrase: "",
                name: "",
                password: "",
                classes: "",
                email: "",
                usertype: "",
                textFieldValue: "",
                errors: []
            };
        }
    };
</script>

<style scoped>
    
    TextField {
        color: #000000;
    }

    .page {
        align-items: center;
        flex-direction: column;
        color: #000;
    }

 
    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: #4c4c47;
    }

    .btn-primary {
        height: 50;
        width: 200;
        margin: 30 5 15 5;
        background-color: gray;
        border-radius: 5;
        font-size: 20;
        font-weight: 600;
    }

    .enter {
        width: 300;
        background-color: #fff;
    }
</style>