var app = angular.module('BookApp', []);

app.controller('BookController', function ($scope, $http) {
    var Url = "https://localhost:7175/";

    $scope.applicants = [];
    $scope.BookDetails = [];
    $scope.Price = 0;
    $scope.submitForm = function () {
        var req = {};
        req = $scope.formData;
        req.publicationDate = $scope.formData.publicationDate.toJSON();

        $.ajax({
            url: Url + "api/Booking/Add-Book-Details",
            type: "POST",
            data: req,
            success: function (response) {
                $scope.getDataFromAPI();
                $scope.clearForm();                
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    };

    $scope.clearForm = function () {
        $scope.formData = {};
        $("#Addmodal").hide();
        $("#showmodal").hide();
    };

    $scope.ShowApplicant = function (applicantId) {
        $("#showmodal").show();
        var req = {};
        req.BookId = applicantId;
        $.ajax({
            url: Url + "api/Booking/Show-Book-Details",
            type: "POST",
            data: req,
            success: function (response) {
                
                $scope.BookDetails = response.data;
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    };

    $scope.getDataFromAPI = function () {
        $.ajax({
            url: Url + "api/booking/Get-Book-Details",
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (result) {
                $scope.applicants = result.data;
                $scope.$apply();
            },
            dataType: "json"
        });
    };

    $scope.getDataFromAPI();

    $scope.BookPrice = function () {
        $.ajax({
            url: Url + "api/Booking/Total-Price-Book",
            type: "POST",
            success: function (response) {
                $scope.Price = response.data;
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    }
    $scope.BookPrice();
    $scope.AddApplicant = function () {
        $("#Addmodal").show();
    }
});