using AutoMapper;
using UserManager.Dtos;
using UserManager.Models;

namespace UserManager.Mapper
{
    public class InputToModel : Profile
    {
        public InputToModel()
        {
            CreateMap<UserInput, User>();
        }
    }
}
