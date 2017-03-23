$(document).ready(function () {

  var toggleProjectList = function () {
    var selectedVal = $("#digest_rule_project_selector").val();
    switch (selectedVal) {
        case 'selected':
        case 'not_selected':
        case 'member_not_selected':
            $("#digest-rule-issue-queries").hide();
            $("#digest-rule-projects").show();
            break;
        case 'issue_query':
            $("#digest-rule-issue-queries").show();
            $("#digest-rule-projects").hide();
            break;
        default:
            $("#digest-rule-issue-queries").hide();
            $("#digest-rule-projects").hide();
    }
  };

  $("#digest_rule_project_selector").select2({
    width: "40%",
    allowClear: false
  }).on("change", toggleProjectList);

  $("#digest-rule-issue-queries > select").select2({
      width: "40%",
      allowClear: false
  });

  $("#digest_rule_raw_project_ids").select2({
    width: "40%",
    multiple: true,
    data: $("#digest_rule_raw_project_ids").data("options"),
    matcher: function (term, text, option) {
      return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
    }
  });

  toggleProjectList();
});
