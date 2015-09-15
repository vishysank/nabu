function uiRender (apiDetails) {
  var swaggerUi = new SwaggerUi({
    url:apiDetails.api_path,
    dom_id:"swagger-ui-container"
  });

  swaggerUi.api = new SwaggerClient();
  swaggerUi.api.clientAuthorizations.authz.api_key = new SwaggerClient.ApiKeyAuthorization('Authorization', apiDetails.api_token ,'header');

  swaggerUi.load();

}
