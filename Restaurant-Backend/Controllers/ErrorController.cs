using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;

[ApiController]
public class ErrorController : ControllerBase
{
    [Route("/error")]
    public IActionResult HandleError()
    {
        var exception = HttpContext.Features.Get<IExceptionHandlerFeature>()?.Error;

        Log.Error(exception, "Unhandled exception occurred");

        return Problem(
            title: "Error interno del servidor",
            detail: exception?.Message,
            statusCode: 500
        );
    }
}
