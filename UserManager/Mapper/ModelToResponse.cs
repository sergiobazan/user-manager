using AutoMapper;
using UserManager.Dtos;
using UserManager.Models;

namespace UserManager.Mapper
{
    public class ModelToResponse: Profile
    {
        public ModelToResponse()
        {
            CreateMap<User, UserResponse>();
        }
    }
}
