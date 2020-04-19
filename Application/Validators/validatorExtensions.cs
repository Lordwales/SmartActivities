using FluentValidation;

namespace Application.Validators
{
    public static class validatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T> (this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                .MaximumLength(6).WithMessage("Password must be at least 6 characters")
                .Matches("[A-Z]").WithMessage("Password must contain at least 1 uppercase character")
                .Matches("[a-z]").WithMessage("Password must contain at least 1 lowercase character")
                .Matches("[0-9]").WithMessage("Password must contain at least 1 number")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain at non alphanumeric");

            return options;    


        }
    }
}